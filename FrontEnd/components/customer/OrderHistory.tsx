import { Order } from "@/services/orderService"; import OrderCard from "./orders/OrderCard";
export default function OrderHistory({ orders, onRefresh }: { orders: Order[]; onRefresh?: () => void }) { return <div className="space-y-5">{orders.map(order => <OrderCard key={order.id} order={order} onRefresh={onRefresh || (() => undefined)} />)}</div>; }
