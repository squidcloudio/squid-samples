export interface Order {
  O_ORDERKEY: number;
  O_CLERK: String;
  O_COMMENT: String;
  O_CUSTKEY: number;
  O_ORDERDATE: Date;
  O_ORDERPRIORITY: string;
  O_ORDERSTATUS: string;
  O_SHIPPRIORITY: number;
  O_TOTALPRICE: number;
}