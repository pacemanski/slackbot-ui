import React from 'react';
import logo from './logo.svg';
import './App.css';
import Async from 'react-async';

const axios = require('axios').default;

function App() {
    // User Classify
    const [userCategory,setUserCategory] = React.useState('');
    var userId

    function handleUserClassify() {
        axios.get('http://localhost:3000/users/'+userId+'/category')
            .then(function (response) {
                console.log(response)
                setUserCategory(response.data.class)
            })
            .catch(function (error) {
                console.log(error);
                setUserCategory("ERROR: Try another id!")
            })
            .then(function () {
            });
    }

    function handleUserIdChange(event) {
        userId = event.target.value
    }

    // ------
    // CLAPs
    const [clappersResult,setClappersResult] = React.useState('');
    var clappersTop

    function claperToStr(claper) {
        return "userId:"+claper.userId+" has clapped " + claper.times + " times"
    }

    function handleClappersButton() {
        axios.get('http://localhost:3000/users/clapers?top=' + clappersTop)
            .then(function (response) {
                console.log(response)
                var clappers = response.data.clappers
                var clappersString = clappers.map(clapRes => claperToStr(clapRes)).join(', ')
                setClappersResult(clappersString)
            })
            .catch(function (error) {
                console.log(error);
                setClappersResult("ERROR: Try another value!")
            })
            .then(function () {
            });
    }

    function handleClappersChange(event) {
        clappersTop = event.target.value
    }

    // --------
    // Reactions

    const [reactionResult,setReactionResult] = React.useState('');
    var reactionId

    function handleReactionIDChange(event) {
        reactionId = event.target.value
    }

    function reactionToStr(reactionResult) {
        return "userId:"+reactionResult.userId+" has reacted " + reactionResult.times + " times"
    }

    function handleReactionButton() {
        axios.get('http://localhost:3000/reactions/' + reactionId)
            .then(function (response) {
                console.log(response)
                var usage = response.data.usage
                var clappersString = usage.map(use => reactionToStr(use)).join(', ')
                setReactionResult(clappersString)
            })
            .catch(function (error) {
                console.log(error);
                setReactionResult("ERROR: Try another reaction id value!")
            })
            .then(function () {
            });
    }

    // ------
    // Shared
   function handleSubmit(event) { }

  return (
    <div className="App">
      {/*<header className="App-header">*/}
      {/*</header>*/}
        <div>
            <h1>User classify</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={userId} onChange={handleUserIdChange} />
            </form>
            <button onClick={handleUserClassify}>Show User Category</button>
            <div>{userCategory}</div>
            <div></div>
            <h1>Clappers Box</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={clappersTop} onChange={handleClappersChange} />
            </form>
            <button onClick={handleClappersButton}>Show TOP Clappers</button>
            <div>{clappersResult}</div>
            <div></div>
            <h1>Reactions Box</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={reactionId} onChange={handleReactionIDChange} />
            </form>
            <button onClick={handleReactionButton}>Show Reaction</button>
            <div>{reactionResult}</div>
        </div>
    </div>
  );
}

export default App;
