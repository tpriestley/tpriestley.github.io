import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";
import withListLoading from "./withListLoading";
import "../Api.css";

function API() {
    const ListLoading = withListLoading(List);
    const [appState, setAppState] = useState({
      loading: false,
      repos: null,
    });
  

    useEffect(() => {
        setAppState({ loading: true});
        const apiUrl = `https://api.github.com/users/hacktivist123/repos`;
        fetch(apiUrl)
          .then((res) => res.json())
          .then((repos) => {
            setAppState({ loading: false, repos: repos });
          });
      }, [setAppState]);
  
    // componentDidMount() {
    //   axios.get(`https://jsonplaceholder.typicode.com/users/1`)
    // //   axios.get('https://official-joke-api.appspot.com/jokes/random')
    //     .then(res => {
    //       const persons = res.data;
    //       this.setState({ persons });
    //       console.log('Response: ', res);
    //     })
    // }
  
  
  return(
    <main>
        <div className='container'>
        <h1>My Repositories</h1>
        </div>
        <div>
        <ListLoading isLoading={appState.loading} repos={appState.repos} />
        </div>
    </main>
  );
}
export default API;

// class API extends React.Component { 
//     componentDidMount() {
//         const apiUrl = 'https://official-joke-api.appspot.com/jokes/random';
//         fetch(apiUrl)
//             .then((response) => response.json())
//             .then((data) => console.log('Results: ', data));

//     }
//     render() {
//         return <h1>API Component Has Mounted, Check the browser 'console' </h1>;
//     }
// }
