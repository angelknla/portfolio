import Particles from "react-tsparticles";

import boostrapIcon from "../../assets/bootstrap-icon.svg";
import cssIcon from "../../assets/css-icon.svg";
import htmlIcon from "../../assets/html-icon.svg";
import jsIcon from "../../assets/js-icon.svg";
import mysqlIcon from "../../assets/mysql-icon.svg";
import nodeIcon from "../../assets/node-icon.svg";
import reactIcon from "../../assets/react-icon.svg";
import sassIcon from "../../assets/sass-icon.svg";
import typescriptIcon from "../../assets/typescript-icon.svg";
import vscodeIcon from "../../assets/vscode-icon.svg";
import vueIcon from "../../assets/vue-icon.svg";

export const ParticlesBG = () => {
  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: {
          zIndex: -1,
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
        },
        particles: {
          move: {
            direction: "none",
            enable: true,
            outMode: "out",
            speed: 2,
          },
          number: {
            limit: 15,
            value: 5,
          },
          opacity: {
            animation: {
              enable: true,
              minimumValue: 0.2,
              speed: 1,
            },
            random: true,
            value: 1,
          },
          rotate: {
            animation: {
              enable: true,
              speed: 3,
            },
            direction: "random",
            random: true,
            value: 0,
          },
          shape: {
            image: [
              {
                src: boostrapIcon,
                width: 20,
                height: 20,
              },
              {
                src: cssIcon,
                width: 20,
                height: 20,
              },
              {
                src: htmlIcon,
                width: 20,
                height: 20,
              },
              {
                src: jsIcon,
                width: 20,
                height: 20,
              },
              {
                src: mysqlIcon,
                width: 20,
                height: 20,
              },
              {
                src: nodeIcon,
                width: 20,
                height: 20,
              },
              {
                src: reactIcon,
                width: 20,
                height: 20,
              },
              {
                src: sassIcon,
                width: 20,
                height: 20,
              },
              {
                src: typescriptIcon,
                width: 20,
                height: 20,
              },
              {
                src: vscodeIcon,
                width: 20,
                height: 20,
              },
              {
                src: vueIcon,
                width: 20,
                height: 20,
              },
            ],
            type: "image",
          },
          size: {
            animation: {
              enable: false,
              minimumValue: 0.1,
              speed: 30,
              sync: false,
            },
            random: false,
            value: 16,
          },
        },
      }}
    />
  );
};
