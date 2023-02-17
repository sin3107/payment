import buildBillLog from "./bill-log.js";
import buildBillLogDetail from "./bill_log_detail.js";
import buildBillLogProduct from "./bill_log_product.js";
import buildBillLogError from "./bill_log_err.js";
import buildTicket from "./ticket.js";


const BillLog = buildBillLog();
const BillLogDetail = buildBillLogDetail();
const BillLogProduct = buildBillLogProduct();
const BillLogError = buildBillLogError();
const Ticket = buildTicket();

export {
    BillLog,
    BillLogDetail,
    BillLogProduct,
    BillLogError,
    Ticket
}