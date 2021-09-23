export const USER_DUMP = `
INSERT INTO public.organization_model (id, name, "createdAt", "updatedAt") VALUES (1, 'Default Organization', '2021-09-20 12:06:25.319464', '2021-09-20 12:06:25.319464');
INSERT INTO public.organization_model (id, name, "createdAt", "updatedAt") VALUES (2, 'Second Organization', '2021-09-20 12:32:00.807259', '2021-09-20 12:32:00.807259');
INSERT INTO public.organization_model (id, name, "createdAt", "updatedAt") VALUES (3, 'Organization 3', '2021-09-20 13:57:29.251145', '2021-09-20 13:57:29.251145');
INSERT INTO public.organization_model (id, name, "createdAt", "updatedAt") VALUES (4, 'Organization 4', '2021-09-20 13:57:44.676009', '2021-09-20 13:57:44.676009');
INSERT INTO public.organization_model (id, name, "createdAt", "updatedAt") VALUES (5, 'Organization 5', '2021-09-20 14:19:02.769241', '2021-09-20 14:19:02.769241');

ALTER SEQUENCE public.organization_model_id_seq RESTART WITH 7;

INSERT INTO public.user_model VALUES (1, 'galeksic', '8d1dde9bc7230e24b8f87e6cb75d5d6a', '2021-09-20 12:31:21.369885', '2021-09-20 12:31:21.369885', NULL);
INSERT INTO public.user_model VALUES (2, 'test 2', '8d1dde9bc7230e24b8f87e6cb75d5d6a', '2021-09-20 14:28:43.900828', '2021-09-20 14:28:43.900828', NULL);
INSERT INTO public.user_model VALUES (3, 'test', '8d1dde9bc7230e24b8f87e6cb75d5d6a', '2021-09-19 08:37:17.841089', '2021-09-19 08:37:17.841089', 1);
INSERT INTO public.user_model VALUES (4, 'test 3', '8d1dde9bc7230e24b8f87e6cb75d5d6a', '2021-09-20 15:19:00.068777', '2021-09-20 15:19:00.068777', NULL);

ALTER SEQUENCE public.user_model_id_seq RESTART WITH 7;

INSERT INTO public.user_organization (id, "createdAt", "updatedAt", roles, "userId", "organizationId") VALUES (1,'2021-09-20 12:31:21.369885', '2021-09-20 12:31:21.369885', NULL, 1,1);
INSERT INTO public.user_organization (id, "createdAt", "updatedAt", roles, "userId", "organizationId") VALUES (2,'2021-09-20 12:31:21.369885', '2021-09-20 12:31:21.369885', NULL, 2,2);
INSERT INTO public.user_organization (id, "createdAt", "updatedAt", roles, "userId", "organizationId") VALUES (3,'2021-09-20 12:31:21.369885', '2021-09-20 12:31:21.369885', NULL, 3,3);

ALTER SEQUENCE public.user_organization_id_seq RESTART WITH 4;

`;
