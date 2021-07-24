import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import Table from './containers/Table'
import './App.css'

function App() {
  return (
    <div>
      <div className="wrapper">
        <Header />
        <main className="main">
          <Sidebar />
          <div className="pane">
            <Table />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
