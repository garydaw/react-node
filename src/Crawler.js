import './crawler.css';
import logo from './img/sw.png'

export default function Crawler({clearIntro}) {

    return (
        <div className="bg">
            <section className="intro text-center">
                A long time ago, in a galaxy far, far away....
            </section>

            <section className="logo">
            <img className="logoImage" src={logo} alt="Bobba Daw" />
            </section>

            <div id="board">  
                <div id="content">
                <p className="crawlText" id="title">Version I</p>
                <p className="crawlText" id="subtitle">THE INITIAL DEPLOYMENT</p>
                <p className="crawlText">Through tireless hours and countless web searches the SWGOH utilities is here.</p>
                <p className="crawlText">This is the site you're looking for. It is not a trap! Do or do not use this site, there is no try! But if you don't
                    I will find your lack of faith disturbing!</p>        
                </div>  
            </div>
            <button className="bottomRight" onClick={clearIntro}>Skip Intro</button>
        </div>
    )
}
