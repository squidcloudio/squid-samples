export interface Order {
  O_ORDERKEY: number;
  O_CLERK: string;
  O_COMMENT: string;
  O_CUSTKEY: number;
  O_ORDERDATE: Date;
  O_ORDERPRIORITY: string;
  O_ORDERSTATUS: string;
  O_SHIPPRIORITY: number;
  O_TOTALPRICE: number;
}