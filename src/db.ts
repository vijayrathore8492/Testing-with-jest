import mysql from "promise-mysql";

export default class DB {
  
  protected static _pool;

  public static getPool() {
    if (!DB._pool) {
      DB._pool = mysql.createPool({
        host: "localhost",
        port: 3306,
        user: "",
        password: "",
        database: "test"
      });
    }

    return DB._pool;
  }

  public static async executeQuery(query: string, variables?: Object) {
    const pool = await DB.getPool();
    const result = await pool.query(query, variables);
    return result;
  }
}