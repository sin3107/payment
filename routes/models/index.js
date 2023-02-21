import buildBillLog from "./bill-log.js";
import buildBillLogDetail from "./bill_log_detail.js";
import buildBillLogProduct from "./bill_log_product.js";
import buildBillLogError from "./bill_log_err.js";
import buildBillLogSuccess from "./bill_log_success.js";
import buildTicket from "./ticket.js";
import buildStore from "./store.js";
import buildProduct from "./product.js";
import buildMember from "./member.js";
import buildCounters from "./counter.js";

const BillLog = buildBillLog();
const BillLogDetail = buildBillLogDetail();
const BillLogProduct = buildBillLogProduct();
const BillLogError = buildBillLogError();
const BillLogSuccess = buildBillLogSuccess();
const Ticket = buildTicket();
const Store = buildStore();
const Product = buildProduct();
const Member = buildMember();
const Counters = buildCounters();


export {
    BillLog,
    BillLogDetail,
    BillLogProduct,
    BillLogError,
    BillLogSuccess,
    Ticket,
    Store,
    Product,
    Member,
    Counters
}