package com;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.db;
public class DBConnection{
static MongoClient client;
public static MongoClient getCon(){
	try	{
		if(client == null)
			var mongoClient = new MongoClient(new Server('localhost', 27017));
	}
	catch (Exception e)	{
		e.printStackTrace();
	}
	return client;
}
public static void main(String args[])throws Exception{
	System.out.println(create("comment","register"));
	System.out.println(retrieve("comment","register"));
}
