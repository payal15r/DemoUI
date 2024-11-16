++++++++++++++Instrucation+++++++++++
Notes : My Connection string (Replace youre SQL database Connection string)
 
 "DefaultConnection": "server=localhost\\SQLEXPRESS;database=CRUDDB;Trusted_Connection=True;"

Steps 1)
to run migration 
	>Goto Tools > NuGet Package Manager > Package Manager Console
	 write the command 1) 
	 
					PM> Add-Migration "inital-Migration"
			  
Update database command 2) 
					PM> Update-Database
