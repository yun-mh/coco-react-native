import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient as Gradient,
  Stop,
} from "react-native-svg";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Image, Text, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import MapView, { AnimatedRegion, Marker } from "react-native-maps";
import utils from "../../utils";
import colors from "../../colors";

const Container = styled(LinearGradient)`
  width: ${wp(10)}px;
  height: ${wp(10)}px;
  border-radius: ${wp(5)}px;
  justify-content: center;
  align-items: center;
`;

const Background = styled.View`
  padding: 2px;
  background-color: ${colors.white};
  border-radius: ${wp(5)}px;
`;

const colorMyself = ["#FEAC5E", "#C779D0", "#4BC0C8"];

const colorOthers = ["#00F260", "#0575E6"];

const Walker = ({ myself = false }) => {
  return (
    <Container
      colors={myself ? colorMyself : colorOthers}
      start={{ x: 0.1, y: 0.2 }}
    >
      <Background>
        <Svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width={wp(7.5)}
          height={wp(7.5)}
          viewBox="0 0 512.000000 512.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <Defs>
            <Gradient id="myself" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" style={{ stopColor: "#FEAC5E" }} />
              <Stop offset="50%" style={{ stopColor: "#C779D0" }} />
              <Stop offset="100%" style={{ stopColor: "#4BC0C8" }} />
            </Gradient>
            <Gradient id="others" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" style={{ stopColor: "#00F260" }} />
              <Stop offset="100%" style={{ stopColor: "#0575E6" }} />
            </Gradient>
          </Defs>

          <G
            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
            fill={myself ? `url(#myself)` : `url(#others)`}
            stroke="none"
          >
            <Path
              d="M1635 4845 c-388 -86 -663 -397 -740 -839 -8 -49 -15 -111 -15 -137
              l0 -49 -49 0 c-59 0 -163 -21 -244 -49 -488 -170 -712 -735 -512 -1291 112
              -310 332 -563 611 -703 l71 -36 -23 -101 c-32 -141 -44 -254 -44 -405 1 -446
              149 -748 435 -890 123 -61 187 -77 340 -82 158 -6 262 12 513 89 545 167 619
              167 1164 0 254 -78 355 -95 518 -89 225 9 375 70 515 211 166 167 241 374 252
              696 6 183 -5 308 -41 469 l-23 102 71 36 c279 140 499 393 611 703 200 556
              -24 1121 -512 1291 -81 28 -185 49 -244 49 l-49 0 0 48 c0 130 -46 313 -115
              458 -161 337 -465 534 -821 534 -243 0 -470 -93 -669 -273 l-75 -68 -75 68
              c-142 129 -320 223 -487 257 -93 19 -278 20 -363 1z m346 -562 c227 -106 389
              -398 389 -698 -1 -400 -278 -632 -577 -485 -219 108 -373 394 -374 694 0 170
              47 310 138 407 85 91 156 120 278 116 65 -3 94 -9 146 -34z m1471 4 c66 -32
              146 -114 183 -186 118 -235 74 -594 -101 -822 -230 -299 -571 -297 -719 4
              -178 363 23 905 380 1024 66 22 192 12 257 -20z m-2487 -1022 c168 -44 312
              -167 404 -345 67 -130 76 -169 76 -320 0 -128 -2 -138 -29 -198 -110 -237
              -396 -255 -632 -39 -246 226 -317 618 -146 808 87 97 195 128 327 94z m3411
              -14 c241 -107 269 -480 58 -777 -112 -158 -290 -264 -444 -264 -148 0 -275
              109 -310 265 -16 71 -13 212 5 280 19 72 72 188 115 250 92 134 246 243 380
              269 51 9 147 -2 196 -23z m-1718 -461 c390 -64 871 -477 1088 -935 89 -188
              132 -360 141 -570 11 -259 -40 -416 -152 -466 -84 -39 -196 -24 -483 65 -340
              105 -496 136 -697 136 -191 0 -349 -31 -687 -136 -216 -67 -293 -84 -378 -84
              -190 1 -271 152 -257 485 9 214 52 384 146 580 188 394 559 745 936 886 121
              45 228 57 343 39z"
            />
          </G>
        </Svg>
      </Background>
    </Container>
  );
};

export default Walker;
