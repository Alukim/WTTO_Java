insert into document (id, first_name, last_name)
values(1, 'Grzegorz', 'Nowak');

insert into document (id, first_name, last_name)
values(2, 'Bartosz', 'Nowakowski');

insert into document (id, first_name, last_name)
values(3, 'Janusz', 'Biznesu');

insert into document (id, first_name, last_name)
values(4, 'Andrzej', 'Lajkonik');

insert into address (id, address_line, city, post_code)
values('1', 'Karola Miarki 13', 'Gliwice', '45-000');

insert into address (id, address_line, city, post_code)
values('2', 'Rostka 21', 'Katowice', '46-700');

insert into address (id, address_line, city, post_code)
values('3', 'Piłsudzkiego 242', 'Zabrze', '45-230');

insert into address (id, address_line, city, post_code)
values('4', 'JavaScripta 123', 'Warszawa', '22-100');

insert into address (id, address_line, city, post_code)
values('5', 'ASP.NET COROWCA 1000', 'Gliwice', '45-000');

insert into address (id, address_line, city, post_code)
values('6', 'Nicponia', 'Radzionków', '00-100');

insert into address (id, address_line, city, post_code)
values('7', 'Naszego Pana i Władcy Bartosz Kowalskiego 1', 'Bytom', '44-902');

update address set document_id = 1 where id = 1;
update address set document_id = 1 where id = 2;
update address set document_id = 3 where id = 3;
update address set document_id = 2 where id = 4;
update address set document_id = 4 where id = 5;
update address set document_id = 2 where id = 6;
update address set document_id = 2 where id = 7;