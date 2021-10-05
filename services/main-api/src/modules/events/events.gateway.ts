import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

const messagingProvider = 'events';

@WebSocketGateway({ cors: true })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private jwtService: JwtService) {}
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');

  @SubscribeMessage(messagingProvider)
  handleMessage(client: Socket, payload: string): void {
    this.server.emit(messagingProvider, payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init EventsGateway');
  }

  sendMessage(message: any) {
    this.server.emit(messagingProvider, message);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.verifyClient(client)
      .then((decoded: IJWT) => {
        this.logger.log(
          `WS:// Client Connected: ${JSON.stringify({
            id: decoded.sub,
            username: decoded.username,
          })}`,
        );
        client.data.sub = decoded.sub;
      })
      .catch((e) => {
        this.logger.log(`Client Rejected: ${client.id}`);
      });
  }

  async verifyClient(client: Socket) {
    if (!client.handshake.headers.authorization) {
      return client.client._disconnect();
    }
    const token = client.handshake.headers.authorization;
    return this.jwtService.verifyAsync(token).catch((er) => {
      this.sendToSpecificClient(client, 'INVALID AUTHENTICATION TOKEN');
      client.client._disconnect();
      return Promise.reject();
    });
  }

  sendToSpecificClient(client: Socket, message: any) {
    client.emit(messagingProvider, message);
  }

  sendToUser(sub: number, message: any) {
    let client: Socket;
    this.server.sockets.sockets.forEach((socket) => {
      if (socket.data.sub === sub) {
        client = socket;
      }
    });
    if (client) {
      this.sendToSpecificClient(client, JSON.stringify(message));
    }
  }
}
