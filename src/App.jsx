import "./App.css";
import { User , Link} from "@nextui-org/react";
function App() {
  // Function to check if the user agent is for a mobile device
    function isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Redirect if not a mobile device
    if (isMobile()) {
      return <>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio blanditiis ipsum ea impedit ipsam eos doloremque, sint nostrum nobis laudantium perspiciatis officia doloribus quas voluptatum fuga incidunt ex repellat. Rem asperiores blanditiis, dolorem nisi itaque commodi voluptatum, amet corporis et quae, ducimus quia assumenda. Eum quae impedit expedita at error sequi sunt fugit eos. Accusantium in laboriosam illo consectetur expedita natus ipsum pariatur possimus ipsa, quis temporibus ipsam asperiores, illum ad placeat corporis rerum. Error iste, expedita sunt perferendis corrupti, recusandae deserunt id dolorum fugiat mollitia porro repudiandae, vel laudantium quaerat doloremque iusto exercitationem a aspernatur. Vitae, reprehenderit enim provident illum ab, eum veniam odit natus obcaecati amet inventore perspiciatis!</h1>
      </>
    }else{
      // window.location.replace("not_mobile.html"); // Redirect to a page indicating that the site is not accessible on non-mobile devices
    }
}

export default App;
