import Api from './Api';
import Post from './Pages/Post';
import DetailPage from './Pages/DetailPage';
import { Routes, Route} from 'react-router-dom';
  
function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route path = "/" element={<Api/>} />
          <Route path = "/detail/:id" element={<DetailPage />} />
          <Route path = "/api/post" element={<Post/>} />
        </Routes>
      </div>

    </>
  );
}



export default App;
