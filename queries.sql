-- Database Queries

-- Find all customers with postal code 1010
select contactname, PostalCode from customer
where PostalCode = 1010
-- Find the phone number for the supplier with the id 11
select contactname, phone from supplier
where id = 11
-- List first 10 orders placed, sorted descending by the order date
SELECT * FROM order
ORDER BY orderdate desc
LIMIT 10
-- Find all customers that live in London, Madrid, or Brazil
select * from customer WHERE City in ('London','Madrid') or Country='Brazil'
-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
insert into customer (contacttitle, contactname, address, city, postalcode, country)
values ('The Shire', 'Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', '111', 'Middle Earth')
-- to find bilbo
select * from [customer]
where contactName like 'bilbo%'
-- Update Bilbo Baggins record so that the postal code changes to "11122"
update customer
set postalcode = '11122'
where contactname = 'Bilbo Baggins'
-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted
select count (distinct(city)) from customer
-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
select * from supplier where length(ContactName)>20
