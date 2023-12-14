import {error} from "@sveltejs/kit";
import {isAsset} from "$lib/shared";
import type {MiddlewareBuilder} from "./utils";

/** Implements the `not-found` middleware interface */
export default (({logger, event, resolve}) => ({
  canSkip() {
    return event.route.id !== null || isAsset(event.route.id, event.url);
  },
  resolve() {
    return resolve(event);
  },
  run() {
    logger.warn("Page not found", {event});
    throw error(404, "Not Found");
  }
})) satisfies MiddlewareBuilder;
