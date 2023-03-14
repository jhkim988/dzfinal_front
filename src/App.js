import logo from './logo.svg';
import './App.css';
import ReceptionInformation from './Reception/ReceptionInformation';
import Receipt from './Reception/Receipt';
import ReceiptDetails from './Reception/ReceiptDetails'
import Card from './Reception/Card'

function App() {
  return (
    <>
    <h1>수납하기</h1>
    <ReceptionInformation />
    <ReceiptDetails />
    <br/>
    <Receipt/>
    <br/>
    <Card />
    </>
  );
}

export default App;
