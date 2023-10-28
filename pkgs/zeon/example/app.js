export default {
  name: "TNM Example",
  description: "Example application by TNM that opens an iframe.",
  ver: 1.3,
  type: "process",
  exec: async function (Root) {
    let wrapper;
    let TNMWindow;

    console.log("Hello from the TNM app!");

    Root.Lib.setOnEnd((_) => TNMWindow.close());

    const Win = (await Root.Lib.loadLibrary("WindowSystem")).win;

    TNMWindow = new Win({
      title: "TNM",
      content: '<iframe src="https://tnm.lol/">',
      pid: Root.PID,
      onclose: () => {
        Root.Lib.onEnd();
      },
    });

    wrapper = TNMWindow.window.querySelector(".win-content");
    wrapper.style.padding = "0px";

    return Root.Lib.setupReturns((m) => {
      console.log("Example received message: " + m);
    });
  },
};
