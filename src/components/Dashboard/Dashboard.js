import React, { useState } from 'react';
import './Dashboard.css';
import useToken from '../App/useToken';


//TODO 
// USE ID TOKEN DATA IN RETRIEVING USER'S RECORD FROM SQL TABLE (JWTVERIFY-->DATA)
// FOR NOW JUST CREATE SYSTEM WHICH IMPORTS THE DATA AND DISPLAYS IT ON THIS PAGE


async function getStats(credentials) {

  return fetch('http://localhost:8080/retrieveStats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'

    },

    body: JSON.stringify(credentials)

  })

    .then(data => data.json())

}



export default function Dashboard() {

  const [stats, SetStats] = useState()
  const { token } = useToken();

  async function SetStatsfunc() {


    console.log(token)
    const userStats = await getStats({ token })
    console.log(userStats)

    try {

      if (userStats.error) {

        alert("The server was unable to verify your session")


      }
      else if (userStats.results) {

        //change this to quiz score stats and display it on dashboard
        console.log(userStats.results[0].id)
        SetStats(true)



      }

    } catch {

      alert("A server error occurred")


    }

  }

  SetStatsfunc()

  console.log(stats)




  return (
    <div>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" content="A front-end template that helps you build fast, modern mobile web apps." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
      <title>Material Design Lite</title>
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content="Material Design Lite" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&lang=en" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.cyan-light_blue.min.css" />
      <link rel="stylesheet" href="styles.css" />
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Home</span>
            <div className="mdl-layout-spacer" />
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
              <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
                <i className="material-icons">search</i>
              </label>
              <div className="mdl-textfield__expandable-holder">
                <input className="mdl-textfield__input" type="text" id="search" />
                <label className="mdl-textfield__label" htmlFor="search">Enter your query...</label>
              </div>
            </div>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
              <i className="material-icons">more_vert</i>
            </button>
            <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" htmlFor="hdrbtn">
              <li className="mdl-menu__item">About</li>
              <li className="mdl-menu__item">Contact</li>
              <li className="mdl-menu__item">Legal information</li>
            </ul>
          </div>
        </header>
        <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
          <header className="demo-drawer-header">
            <img src="https://image.ibb.co/mGn5np/user.jpg" className="demo-avatar" />
            <div className="demo-avatar-dropdown">
              <span>hello@example.com</span>
              <div className="mdl-layout-spacer" />
              <button id="accbtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                <i className="material-icons" role="presentation">arrow_drop_down</i>
                <span className="visuallyhidden">Accounts</span>
              </button>
              <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="accbtn">
                <li className="mdl-menu__item">hello@example.com</li>
                <li className="mdl-menu__item">info@example.com</li>
                <li className="mdl-menu__item"><i className="material-icons">add</i>Add another account...</li>
              </ul>
            </div>
          </header>
          <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
            <a className="mdl-navigation__link" href><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home</a>
            <a className="mdl-navigation__link" href><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Inbox</a>
            <a className="mdl-navigation__link" href><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete</i>Trash</a>
            <a className="mdl-navigation__link" href><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">report</i>Spam</a>
            <a className="mdl-navigation__link" href><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">forum</i>Forums</a>
            <a className="mdl-navigation__link" href><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">flag</i>Updates</a>
            <a className="mdl-navigation__link" href><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">local_offer</i>Promos</a>
            <a className="mdl-navigation__link" href><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">shopping_cart</i>Purchases</a>
            <a className="mdl-navigation__link" href><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">people</i>Social</a>
            <div className="mdl-layout-spacer" />
            <a className="mdl-navigation__link" href><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span className="visuallyhidden">Help</span></a>
          </nav>
        </div>
        <main className="mdl-layout__content mdl-color--grey-100">
          <div className="mdl-grid demo-content">
            <div className="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid">
              <svg fill="currentColor" width="200px" height="200px" viewBox="0 0 1 1" className="demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop">
                <use xlinkHref="#piechart" mask="url(#piemask)" />
                <text x="0.5" y="0.5" fontFamily="Roboto" fontSize="0.3" fill="#888" textAnchor="middle" dy="0.1">82<tspan fontSize="0.2" dy="-0.07">%</tspan></text>
              </svg>
              <svg fill="currentColor" width="200px" height="200px" viewBox="0 0 1 1" className="demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop">
                <use xlinkHref="#piechart" mask="url(#piemask)" />
                <text x="0.5" y="0.5" fontFamily="Roboto" fontSize="0.3" fill="#888" textAnchor="middle" dy="0.1">82<tspan dy="-0.07" fontSize="0.2">%</tspan></text>
              </svg>
              <svg fill="currentColor" width="200px" height="200px" viewBox="0 0 1 1" className="demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop">
                <use xlinkHref="#piechart" mask="url(#piemask)" />
                <text x="0.5" y="0.5" fontFamily="Roboto" fontSize="0.3" fill="#888" textAnchor="middle" dy="0.1">82<tspan dy="-0.07" fontSize="0.2">%</tspan></text>
              </svg>
              <svg fill="currentColor" width="200px" height="200px" viewBox="0 0 1 1" className="demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop">
                <use xlinkHref="#piechart" mask="url(#piemask)" />
                <text x="0.5" y="0.5" fontFamily="Roboto" fontSize="0.3" fill="#888" textAnchor="middle" dy="0.1">82<tspan dy="-0.07" fontSize="0.2">%</tspan></text>
              </svg>
            </div>
            <div className="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--8-col">
              <svg fill="currentColor" viewBox="0 0 500 250" className="demo-graph">
                <use xlinkHref="#chart" />
              </svg>
              <svg fill="currentColor" viewBox="0 0 500 250" className="demo-graph">
                <use xlinkHref="#chart" />
              </svg>
            </div>
            <div className="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
              <div className="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop">
                <div className="mdl-card__title mdl-card--expand mdl-color--teal-300">
                  <h2 className="mdl-card__title-text">Updates</h2>
                </div>
                <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                  Non dolore elit adipisicing ea reprehenderit consectetur culpa.
            </div>
                <div className="mdl-card__actions mdl-card--border">
                  <a href="#" className="mdl-button mdl-js-button mdl-js-ripple-effect">Read More</a>
                </div>
              </div>
              <div className="demo-separator mdl-cell--1-col" />
              <div className="demo-options mdl-card mdl-color--deep-purple-500 mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--12-col-desktop">
                <div className="mdl-card__supporting-text mdl-color-text--blue-grey-50">
                  <h3>View options</h3>
                  <ul>
                    <li>
                      <label htmlFor="chkbox1" className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
                        <input type="checkbox" id="chkbox1" className="mdl-checkbox__input" />
                        <span className="mdl-checkbox__label">Click per object</span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="chkbox2" className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
                        <input type="checkbox" id="chkbox2" className="mdl-checkbox__input" />
                        <span className="mdl-checkbox__label">Views per object</span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="chkbox3" className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
                        <input type="checkbox" id="chkbox3" className="mdl-checkbox__input" />
                        <span className="mdl-checkbox__label">Objects selected</span>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="chkbox4" className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
                        <input type="checkbox" id="chkbox4" className="mdl-checkbox__input" />
                        <span className="mdl-checkbox__label">Objects viewed</span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="mdl-card__actions mdl-card--border">
                  <a href="#" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--blue-grey-50">Change location</a>
                  <div className="mdl-layout-spacer" />
                  <i className="material-icons">location_on</i>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" style={{ "position": "fixed", "left": "-1000px", "height": "-1000px" }}>
        <defs>
          <mask id="piemask" maskContentUnits="objectBoundingBox">
            <circle cx="0.5" cy="0.5" r="0.49" fill="white" />
            <circle cx="0.5" cy="0.5" r="0.40" fill="black" />
          </mask>
          <g id="piechart">
            <circle cx="0.5" cy="0.5" r="0.5" />
            <path d="M 0.5 0.5 0.5 0 A 0.5 0.5 0 0 1 0.95 0.28 z" stroke="none" fill="rgba(255, 255, 255, 0.75)" />
          </g>
        </defs>
      </svg>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 250" style={{ "position": "fixed", "left": "-1000px", "height": "-1000px" }}>
        <defs>
          <g id="chart">
            <g id="Gridlines">
              <line fill="#888888" stroke="#888888" strokeMiterlimit={10} x1={0} y1="27.3" x2="468.3" y2="27.3" />
              <line fill="#888888" stroke="#888888" strokeMiterlimit={10} x1={0} y1="66.7" x2="468.3" y2="66.7" />
              <line fill="#888888" stroke="#888888" strokeMiterlimit={10} x1={0} y1="105.3" x2="468.3" y2="105.3" />
              <line fill="#888888" stroke="#888888" strokeMiterlimit={10} x1={0} y1="144.7" x2="468.3" y2="144.7" />
              <line fill="#888888" stroke="#888888" strokeMiterlimit={10} x1={0} y1="184.3" x2="468.3" y2="184.3" />
            </g>
            <g id="Numbers">
              <text transform="matrix(1 0 0 1 485 29.3333)" fill="#888888" fontFamily="'Roboto'" fontSize={9}>500</text>
              <text transform="matrix(1 0 0 1 485 69)" fill="#888888" fontFamily="'Roboto'" fontSize={9}>400</text>
              <text transform="matrix(1 0 0 1 485 109.3333)" fill="#888888" fontFamily="'Roboto'" fontSize={9}>300</text>
              <text transform="matrix(1 0 0 1 485 149)" fill="#888888" fontFamily="'Roboto'" fontSize={9}>200</text>
              <text transform="matrix(1 0 0 1 485 188.3333)" fill="#888888" fontFamily="'Roboto'" fontSize={9}>100</text>
              <text transform="matrix(1 0 0 1 0 249.0003)" fill="#888888" fontFamily="'Roboto'" fontSize={9}>1</text>
              <text transform="matrix(1 0 0 1 78 249.0003)" fill="#888888" fontFamily="'Roboto'" fontSize={9}>2</text>
              <text transform="matrix(1 0 0 1 154.6667 249.0003)" fill="#888888" fontFamily="'Roboto'" fontSize={9}>3</text>
              <text transform="matrix(1 0 0 1 232.1667 249.0003)" fill="#888888" fontFamily="'Roboto'" fontSize={9}>4</text>
              <text transform="matrix(1 0 0 1 309 249.0003)" fill="#888888" fontFamily="'Roboto'" fontSize={9}>5</text>
              <text transform="matrix(1 0 0 1 386.6667 249.0003)" fill="#888888" fontFamily="'Roboto'" fontSize={9}>6</text>
              <text transform="matrix(1 0 0 1 464.3333 249.0003)" fill="#888888" fontFamily="'Roboto'" fontSize={9}>7</text>
            </g>
            <g id="Layer_5">
              <polygon opacity="0.36" strokeMiterlimit={10} points="0,223.3 48,138.5 154.7,169 211,88.5
        294.5,80.5 380,165.2 437,75.5 469.5,223.3 	" />
            </g>
            <g id="Layer_4">
              <polygon strokeMiterlimit={10} points="469.3,222.7 1,222.7 48.7,166.7 155.7,188.3 212,132.7
        296.7,128 380.7,184.3 436.7,125 	" />
            </g>
          </g>
        </defs>
      </svg>
    </div>
  );


}