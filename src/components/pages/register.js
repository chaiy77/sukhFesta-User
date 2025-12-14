import { useUserContext } from "@/context/userContext";
import { REGISTER_USER } from "@/store/graphql/user";
import { Button } from "@/components/ui/button";
import { callApiLog } from "@/tools/apiLog";
import { useMutation } from "@apollo/client/react";

export default function RegisterPageComponent({ gotoPage }) {
  const { user, setUser } = useUserContext();

  const [doRegister] = useMutation(REGISTER_USER);

  const registerUserHandle = async () => {
    callApiLog("register -> dop register user ");
    callApiLog(user.lineToken.toString());

    const { data, error } = await doRegister({
      variables: { lineToken: user.lineToken },
    });

    callApiLog(JSON.stringify(data));
    callApiLog(JSON.stringify(error));
    let result = data.registerUser.result;
    let _user = data.registerUser.items;

    if (!error && result.success && _user.id) {
      callApiLog("user = ");
      callApiLog(JSON.stringify(_user));
      setUser(_user);
      gotoPage("main");
    }
  };
  //  doUpdateWorkplacProfile({
  //       variables: { input: data },
  //       onCompleted: () => {
  //         //   setSensors([]);
  //         //   setModalClose(!isModalClose);
  //         onCancel();
  //         window.location.reload(false);
  //       },
  //     });

  return (
    <div>
      <div className="w-full items-center justify-center">
        User Policy/ ข้อตกลง
      </div>
      <Button
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-6 text-lg shadow-lg"
        onClick={() => registerUserHandle()}
      >
        Register
      </Button>
    </div>
  );
}
