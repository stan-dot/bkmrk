import { BookmarkNode } from "../../lib/typesFacade";

export default class Filterer {
  static byRegex(nodes: BookmarkNode[], regex: RegExp): BookmarkNode[] {
    return [];
  }
  static dateAddedBefore(nodes: BookmarkNode[], cutoff: Date): BookmarkNode[] {
    return [];
  }
}
