import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPayments, setLoans } from '../redux/actions';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  
  // Correct the selector to access the `data` slice of the state
  const payments = useSelector((state) => state.data.payments || []);
  const loans = useSelector((state) => state.data.loans || []);

  // Mock fetching data
  useEffect(() => {
    // Simulamos la carga de datos
    dispatch(setPayments([
      { id: 1, user: 'Juan Pérez', amount: 200, date: '2025-03-01', status: 'Completed' },
      { id: 2, user: 'María López', amount: 150, date: '2025-03-05', status: 'Pending' },
    ]));
    
    dispatch(setLoans([
      { id: 1, user: 'Juan Pérez', amount: 2000, status: 'Approved', remainingAmount: 1800 },
      { id: 2, user: 'María López', amount: 1500, status: 'Pending', remainingAmount: 1500 },
    ]));
  }, [dispatch]);

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Administrador</h1>

      <section className="payments-section">
        <h2>Pagos Realizados</h2>
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.user}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.date}</td>
                  <td>{payment.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay pagos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="loans-section">
        <h2>Préstamos Aprobados</h2>
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Monto Restante</th>
            </tr>
          </thead>
          <tbody>
            {loans.length > 0 ? (
              loans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.user}</td>
                  <td>${loan.amount}</td>
                  <td>{loan.status}</td>
                  <td>${loan.remainingAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay préstamos aprobados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      
      <section className="report-section">
        <h2>Generar Reportes</h2>
        <button onClick={() => alert('Generando reporte...')}>Generar Reporte de Pagos</button>
      </section>
    </div>
  );
};

export default AdminDashboard;
