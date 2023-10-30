
import { Route,BrowserRouter as  Router, Routes } from 'react-router-dom';
import './App.css';
import SignUpPage from './Pages/SignUpPage';
import Profile from './Pages/Profile';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { setUser } from './slices/userSlice';
import PrivateRoutes from './Components/common/PrivateRoutes';
import CreateAPodcastPage from './Pages/CreateAPodcast';
import PodcastsPage from './Pages/Podcasts';
import PodcastDetailsPage from './Pages/PodcastDetails';
import CreateAnEpisodePage from './Pages/CreateAnEpisode';

function App() {

  const dispatch=useDispatch()
  useEffect(()=>{
    const unsubscribeAuth=onAuthStateChanged(auth,(user)=>{
      if(user){
        const unsubscribeSnapshot=onSnapshot(
          doc(db,"users",user.uid),(userDoc) =>{
            if(userDoc.exists()){
              const userData=userDoc.data()
              dispatch(
                setUser({
                  name:userData.name,
                  email:userData.email,
                  uid:user.uid,
                })
              )
            }
          },
          (error)=>{
            console.log("Error fetching user data:",error)
          }
        );
        return ()=>{
          unsubscribeSnapshot()
        }
      }
    });

    return ()=>{
      unsubscribeAuth();
    }
  },[]);
  return (
    <div className="App">
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path='/' element={<SignUpPage/>} />
          <Route element={<PrivateRoutes/>} >
            {/* private routes inside this */}
            <Route path='/profile' element={<Profile/>} />
            <Route path='/create-a-podcast' element={<CreateAPodcastPage/>} />
            <Route path='/podcasts' element={<PodcastsPage/>}/>
            <Route path='/podcast/:id' element={<PodcastDetailsPage/>}/>
            <Route 
                  path='/podcast/:id/create-episode' 
                  element={<CreateAnEpisodePage/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
