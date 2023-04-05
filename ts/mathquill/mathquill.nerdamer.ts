import * as nerd from "nerdamer";
import "nerdamer/Algebra.js";
import "nerdamer/Calculus.js";
import "nerdamer/Solve.js";
//import "nerdamer/Extra.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const nerdamer = nerd.default;
import { extendNerdamer } from "./extendNerdamer";

extendNerdamer(nerdamer);

export default nerdamer;