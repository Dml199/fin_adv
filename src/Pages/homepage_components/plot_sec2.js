

import Candle_plot from "../../graph_plots/charts/candlestick.js"
import "./homepage_styles/section_1.css"
import "./homepage_styles/sec_2.css"
 export default function Plot_homepage (){


return(<div>

<div id ="sec_2">
<Candle_plot/>
<div id = "info_list">
    <table id="stock_info_table">
        <tr><button>Fundamentals</button> <button>News</button></tr>
    </table>
</div>
</div>

</div>)


}

