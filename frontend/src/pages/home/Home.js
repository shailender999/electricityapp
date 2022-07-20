import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllBills } from "../../api/bills";

function Home() {
    const [bills, setBills] = useState();
    useEffect(() => {
        fetchAllBills().then(res => setBills(res));
        
    }, []);
    return (
        <div className="row">
            <div className="col-10 m-auto">
                <h3>Bills</h3>
                <table className="table table-stripped table-bordered">
                    <thead>
                        <tr>
                            <th>Bill ID</th>
                            <th>Amount</th>
                            <th>Unit Consumed</th>
                            <th>Generated On</th>
                            <th>Paid On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           bills && bills.map(bill => (
                                <tr>
                                    <td>{bill.id}</td>
                                    <td>{bill.amount}</td>
                                    <td>{bill.units}</td>
                                    <td>{bill.billdate}</td>
                                    <td>{bill.paiddate}</td>
                                    <td>
                                        <Link to={`/bill/${bill.id}`}>
                                            <button type="button" className="btn btn-success">View</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
     );
}

export default Home;