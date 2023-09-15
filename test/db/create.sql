drop table if exists meta;drop table if exists meta1;
create table if not exists meta(version integer);
create table if not exists meta1(version integer);
insert into meta values(1);
insert into meta values(2);
insert into meta1 values(1.1)