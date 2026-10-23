import { PlatformStreamNotice, PlatformTagsDTO } from "../interfaces/IPlatformController";
/**
 * Splits a tags response into its data blocks and the stream notice platform-api appends as the
 * last element when the read was interrupted while the body was already being streamed: at that
 * point the status code is committed to 200, so the abort cannot travel as an HTTP error any more
 * (see `stream_notice` / `guardRawStream` in platform-api).
 *
 * Also covers the legacy shape: platform versions without the in band notice closed the response
 * abruptly, so the body arrived truncated and axios left it as a string instead of an array.
 */
export declare function splitStreamNotice(response: unknown): {
    blocks: PlatformTagsDTO[];
    notice?: PlatformStreamNotice;
};
