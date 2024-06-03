import "./homepage_components/homepage_styles/section_1.css";

import Plot_homepage from "./homepage_components/plot_sec2.js";
import THREE_scene from "../page_components/frontpage_3d_canvas.js";
import Navbar from "./homepage_components/top_navbar.js"

export default function HomePage () {


    return (<div >
        <div>
   
          <Navbar/>
          <THREE_scene/>
       
        <div id="_gradient">
            
        <hr id= "low_panel"></hr>
        
        </div>
        </div>
       
        <Plot_homepage/>
        
       
    </div>)
}