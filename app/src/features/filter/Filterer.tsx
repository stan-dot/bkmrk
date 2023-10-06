import { BookmarkNode } from "../../lib/typesFacade";
import { isAFolder } from "../../utils/ifHasChildrenFolders";

export default class Filterer {
  static bigFilter(filter: FilterSearch, rows: BookmarkNode[]): BookmarkNode[] {
    let nodes = rows;
    if (filter.mainPage) {
      nodes = this.byMainPage(nodes, filter.mainPage);
    }
    return nodes;
  }

  // NOTE - this will always exclude folders
  static byUrlRegex(nodes: BookmarkNode[], regex: RegExp): BookmarkNode[] {
    return nodes.filter((b) => b.url && b.url?.match(regex));
  }

  static byTitleRegex(nodes: BookmarkNode[], regex: RegExp): BookmarkNode[] {
    return nodes.filter((b) => b.title && b.title.match(regex));
  }

  static byMainPage(nodes: BookmarkNode[], startUrl: string): BookmarkNode[] {
    const end = startUrl.length;
    return nodes.filter((b) => b.url && b.title.substring(0, end) === startUrl);
  }

  static byOnlyFolder(nodes: BookmarkNode[]): BookmarkNode[] {
    return nodes.filter(isAFolder);
  }
  static byOnlyBookmark(n: BookmarkNode[]): BookmarkNode[] {
    return n.filter((b) => !isAFolder(b));
  }

  static byDateAddedBeforeDate(
    n: BookmarkNode[],
    before: Date,
    after: Date,
  ): BookmarkNode[] {
    const a = after.getTime();
    return n.filter((v) => v.dateAdded && v.dateAdded < a);
  }

  static byDateAddedAfterDate(n: BookmarkNode[], cutoff: Date): BookmarkNode[] {
    const c = cutoff.getTime();
    return n.filter((v) => v.dateAdded && v.dateAdded > c);
  }
}

export interface FilterSearch {
  urlRegex?: RegExp;
  titleRegex?: RegExp;
  mainPage?: string;
  substringInName?: string;
  onlyFolder: boolean;
  onlyBookmark: boolean;
  dateAddedBefore?: Date;
  dateAddedAfter?: Date;
}

export const defaultFilters: FilterSearch = {
  onlyFolder: false,
  onlyBookmark: false,
};
