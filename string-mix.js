function mix(s1, s2) {
  console.log(s1);
  console.log(s2);
  const regex = /[a-z]/g;
  const [a, b] = [
    buildStringData(s1.match(regex), 1),
    buildStringData(s2.match(regex), 2),
  ];
  const maximums = getMaximums(a, b);
  const mix = buildResults(maximums);
  console.log('final mix = ', mix);
  return mix;
}

function buildStringData(arr, origin) {
  const data = {};

  for (let i = 0; i < arr.length; i++) {
    if (!data.hasOwnProperty(arr[i])) {
      data[arr[i]] = {
        count: 1,
        origin: origin,
      };
    } else {
      data[arr[i]].count += 1;
    }
  }

  return data;
}

function getMaximums(a, b) {
  const maximums = {};
  for (let property in a) {
    if (a[property].count > 1) {
      maximums[property] = a[property];
    }
  }

  for (let property in b) {
    if (maximums.hasOwnProperty(property)) {
      if (b[property].count > maximums[property].count) {
        maximums[property] = b[property];
      } else if (maximums[property].count === b[property].count) {
        maximums[property] = { count: b[property].count, origin: '=' };
      }
    } else if (b[property].count > 1) {
      maximums[property] = b[property];
    }
  }

  return convertMaximumsToArray(maximums);
}

function convertMaximumsToArray(maximums) {
  const arr = [];

  for (let property in maximums) {
    arr.push({
      letter: property,
      count: maximums[property].count,
      origin: maximums[property].origin,
    });
  }

  return arr;
}

function buildResults(arr) {
  const byCountAndLetter = arr.sort(
    (a, b) => b.count - a.count || a.letter.localeCompare(b.letter)
  );
  const results = byCountAndLetter.sort((a, b) => {
    if (a.count === b.count && a.origin !== '=' && b.origin === '=') {
      return -1;
    } else {
      return 0;
    }
  });

  return results
    .map((r) => `${r.origin}:${r.letter.repeat(r.count)}`)
    .join('/');
}

function buildResults2(arr) {
  const results = [];

  const sortedByAlphabet = arr.sort((a, b) => a.letter.localeCompare(b.letter));
  console.log('alphabet', sortedByAlphabet);

  const sortedByOrigin = sortedByAlphabet.sort((a, b) => {
    if (a.origin === '=') {
      return 1;
    } else if (a.origin !== '=') {
      return -1;
    } else {
      return 0;
    }
  });
  console.log('origin', sortedByOrigin);

  const sortedByCount = sortedByOrigin.sort((a, b) => a - b);
  console.log('count', sortedByCount);

  return sortedByCount
    .map((r) => `${r.origin}:${r.letter.repeat(r.count)}`)
    .join('/');
}

mix('Are they here', 'yes, they are here');
