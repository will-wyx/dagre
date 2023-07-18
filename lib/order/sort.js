var util = require("../util");

module.exports = sort;

function sort(entries, biasRight, usePrev, keepNodeOrder) {
  var parts = util.partition(entries, entry => {
    const notHasFixOrder = !(entry.hasOwnProperty('fixorder') && !isNaN(entry.fixorder));
    if (keepNodeOrder)
      return notHasFixOrder && entry.hasOwnProperty("barycenter");
    return entry.hasOwnProperty("barycenter");
  });
  var sortable = parts.lhs,
    unsortable = parts.rhs.sort((a, b) => b.i - a.i),
    vs = [],
    sum = 0,
    weight = 0,
    vsIndex = 0;

  sortable.sort(compareWithBias(!!biasRight, !!usePrev));

  vsIndex = consumeUnsortable(vs, unsortable, vsIndex);

  sortable.forEach(entry => {
    vsIndex += entry.vs.length;
    vs.push(entry.vs);
    sum += entry.barycenter * entry.weight;
    weight += entry.weight;
    vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
  });

  var result = {vs: vs.flat(true)};
  if (weight) {
    result.barycenter = sum / weight;
    result.weight = weight;
  }
  return result;
}

function consumeUnsortable(vs, unsortable, index) {
  var last;
  while (unsortable.length && (last = unsortable[unsortable.length - 1]).i <= index) {
    unsortable.pop();
    vs.push(last.vs);
    index++;
  }
  return index;
}

function compareWithBias(bias, usePrev) {
  return (entryV, entryW) => {
    // 排序的时候先判断fixorder，不行再判断重心
    if (entryV.fixorder !== undefined && entryW.fixorder !== undefined) {
      return entryV.fixorder - entryW.fixorder;
    } else if (entryV.barycenter < entryW.barycenter) {
      return -1;
    } else if (entryV.barycenter > entryW.barycenter) {
      return 1;
    }
    // 重心相同，考虑之前排好的顺序
    if (usePrev && entryV.order !== undefined && entryW.order !== undefined) {
      if (entryV.order < entryW.order) {
        return -1;
      } else if (entryV.order > entryW.order) {
        return 1;
      }
    }


    return !bias ? entryV.i - entryW.i : entryW.i - entryV.i;
  };
}
