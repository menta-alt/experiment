package postgresql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class SelectTable {
    public static void main( String args[] )
    {
        Connection connect = null;
        Statement statement = null;
        try {
            Class.forName("org.postgresql.Driver");
            connect = DriverManager
                    .getConnection("jdbc:postgresql://117.50.188.75:5432/elvira",
                            "postgres", "postgres");
            connect.setAutoCommit(false);
            System.out.println("-----数据库打开成功---");

            statement = connect.createStatement();
            ResultSet res = statement.executeQuery( "SELECT * FROM People;" );
            while ( res.next() ) {
                String id = res.getString("id");
                String name = res.getString("name");
                int age  = res.getInt("age");
                String quotes = res.getString("quotes");

                System.out.println( "ID = " + id );
                System.out.println( "NAME = " + name );
                System.out.println( "AGE = " + age );
                System.out.println( "QUOTES = " + quotes );
                System.out.println();
            }
            res.close();
            statement.close();
            connect.close();
        } catch ( Exception e ) {
            System.err.println( e.getClass().getName()+": "+ e.getMessage() );
            System.exit(0);
        }
        System.out.println("-----数据库操作成功---");
    }
}



