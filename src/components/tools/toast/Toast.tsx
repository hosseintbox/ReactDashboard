import { ToastContainer } from "react-toastify";

const Toast: React.FC = () => {
    return (
      <>
        <ToastContainer
          position="top-right"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
         
        />
      </>
    );
  };
  
  export default Toast;