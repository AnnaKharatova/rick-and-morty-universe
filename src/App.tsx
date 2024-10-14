import { Route, Routes } from "react-router-dom";
import SearchPage from "./SearchPage/SearchPage";
import PersonPage from "./PersonPage/PersonPage";
import Header from './components/Header';

function App() {
  return (
    <div className='w-11/12 mx-auto border-2 border-solid border-white rounded-2xl mt-20 p-3  sm:w-2/3 mb-8' >
      <Header />
      <Routes>
        <Route path="/" Component={SearchPage} />
        <Route path="/person/:id" Component={PersonPage} />
      </Routes>
    </div>
  );
}

export default App;