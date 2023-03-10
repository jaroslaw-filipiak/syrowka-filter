import './style.scss';

const boxes = {
  init() {
    const buttons = document.querySelectorAll(`[data-label]`);
    const buttonsArr = [...buttons];

    buttonsArr.map((item) => {
      item.addEventListener('click', () => {
        const isActive = item.classList.contains('is-label-active');
        const activeLabels = document.querySelectorAll('.is-label-active');

        !isActive
          ? boxes.filterBoxes(`${item.dataset.label}`)
          : boxes.UnfilterBoxes2(`${item.dataset.label}`);
      });
    });
  },
  filterBoxes(filterBy) {
    const filter = filterBy;

    const items = document.querySelectorAll(
      `.filtered-items--wrapper [data-prefers]`
    );

    const resultsArr = [...items];

    const hasPreffer = (item) => {
      const itemPreffersList = item.dataset.prefers.split(',');

      if (itemPreffersList.includes(filter)) {
        return true;
      }
    };

    const results = resultsArr.filter(hasPreffer);

    results.map((item) => {
      item.classList.add('is-item-selected');
    });

    this.setActiveLabel(filterBy);
  },
  UnfilterBoxes(filterBy, activeLabelsList, clicked) {
    const filter = filterBy;
    const labels = document.querySelectorAll(`[data-label]`);
    const items = document.querySelectorAll(
      `.filtered-items--wrapper [data-prefers]`
    );

    const labelsArr = [...labels];
    const resultsArr = [...items];

    const hasClass = (item) => {
      const itemClassList = item.classList;

      if (itemClassList.contains('is-label-active')) {
        return true;
      }
    };

    this.removeActiveLabel(filterBy);

    const selectedLabels = labelsArr.filter(hasClass);

    const selectedLabelsArr = [];

    const activeOtherFilters = selectedLabels.map((item) => {
      selectedLabelsArr.push(item.dataset.label);
    });

    console.log('selectedLabelsArr');
    console.log(selectedLabelsArr);
    console.log('selectedLabelsArr');

    const hasPreffer = (item) => {
      const itemPreffersList = item.dataset.prefers.split(',');

      if (itemPreffersList.includes(filter)) {
        return true;
      }
    };

    const results = resultsArr.filter(hasPreffer);
    const allPrefers = document.querySelectorAll(`[data-prefers]`);
    const allPrefersArr = [...allPrefers];
    console.log('allPrefersArr length // 7 default == all');
    console.log(allPrefersArr.length);
    console.log('allPrefersArr length');

    console.log('results');
    console.log(results);
    console.log('results');

    const secondFilter = (results, arr) => {
      // result to s?? ostatnie klikni??te elementy
      //   TODO: co?? tutaj jest nie tak w momencie gdy wiecej ni?? 3 labelki
      results.forEach((item) => {
        const newResults = [];

        // console.log('arr.toString()');
        // console.log(arr.toString());
        // console.log('arr.toString()');

        if (arr.length > 0) {
          results.map((result, index) => {
            if (result.dataset.prefers.includes(arr.toString())) {
              // result.dataset.prefers === listening,group,talking,understanding,personalization includes going,understanding
              console.log('check');
              console.log(result.dataset.prefers);
              console.log(arr.toString());
              console.log(' end check');
              newResults.push(result);
            } else {
            }
          });
        }

        console.log('przefiltrowane: newResults');
        console.log(newResults);
        console.log('przefiltrowane: newResults');

        item.classList.remove('is-item-selected');

        newResults.map((item) => {
          item.classList.add('is-item-selected');
        });
      });
    };

    secondFilter(results, selectedLabelsArr);
  },
  UnfilterBoxes2(clickedFilter) {
    /*


	1. sprawdzam sobie  wszystkie aktywne labelki
	1a. usuwam z tej listy klikni??t obiekt
	1b. wyci??gam z nich dataset i wrzucam do tablicy 
	z currentLabels 

	2.robie sobie drug?? tablice , kt??ra to zawiera wszystkie aktualnie zaznaczone  itemy i wyci??gam z tych item??w dataset. preffers

	3. robie iteracje po drugiej tablicy i sprawdzam czy ka??dy element posiada w prefers ci??g znak??w zaznaczony w labelce , je??eli posiada to nie robie z nim nic a je??eli posiada to wrzucam go do finalnej tablicy z elementami do odznaczenia

	4. robie map po elementach do odznaczenia i usuwam klase is active

	*/

    // odznaczam klikni??t?? labelke
    this.removeActiveLabel(clickedFilter);

    // sprawdzam kt??re aktywne labelki zosta??y i tworze tablice z wszytkimi aktywnymi(zaznaczonymi) labelkami
    const labels = document.querySelectorAll(`.is-label-active`);
    const labelsArr = [...labels];
    const activeLabelsArr = [];
    labelsArr.map((item) => {
      activeLabelsArr.push(item.dataset.label);
    });

    // chcia??bym sprawdzi?? wszystkie aktualnie zaznaczone itemy i zobaczy?? czy czasami
    // jaki?? z tych element??w nie ma w sobie dataset.preffers kt??re aktualnie istnieje
    // w zaznaczonej labelce a raczej w tej tablicy

    // co?? mi si?? zdaje, ??e trzeba doda?? spacje aby to wyodr??bni?? , zrobi?? 2 tablice
    // i je por??wna??

    // mam 2 tablice : z zaznaczonymi labelkami oraz wyci??gam tablice z
    // ka??ego elementu

    // mam dwa stringi z warto??ciami oddzielone spacjami

    const activeItems = document.querySelectorAll('.is-item-selected');
    const activeItemsArr = [...activeItems];
    const matchingItemsArr = [];

    activeItemsArr.map((item, index) => {
      const prefersStr = item.dataset.prefers.split(',').join(' ').toString();
      const activeLabelsStr = activeLabelsArr.toString().split(',').join(' ');

      //   zamiast sprawdza?? activeLabelsStr , lepiej zrobi?? z tego tablice i iterowa??
      //   po ka??dym elemencie tablicy ?
      //   ale ka??dy element w itercji musi by?? osobnym stringiem

      //   console.log('main loop' + index);
      //   console.log('czy element:');
      //   console.log(prefersStr);
      //   console.log('posiada w refsie:');
      //   console.log(activeLabelsStr); // [0][1] ect
      //   console.log(activeItemsArr);

      for (let index = 0; index < activeItemsArr.length; index++) {
        if (prefersStr.includes(activeLabelsArr[index])) {
          matchingItemsArr.push(item);
        } else {
        }
      }
    }); // <<--- end map

    // console.log(activeItemsArr);

    // zanim do wsp??lnych element??w dodam klase is item selected , chcia??bym wzi??????
    // wszystkie mo??liwe elementy i usun??c im t?? klasy - aby zosta??y tylko cz????ci wsp??lne

    activeItemsArr.map((item) => {
      item.classList.remove('is-item-selected');
    });

    // wsp??lnie elementy (zostawiam aktywn?? klase)
    // console.log(matchingItemsArr);
    // matchingItemsArr.classList.add('is-item-selected');

    matchingItemsArr.map((item) => {
      item.classList.add('is-item-selected');
    });
  },
  setActiveLabel(cat) {
    const button = document.querySelector(`[data-label='${cat}']`);
    button.classList.add('is-label-active');
  },
  removeActiveLabel(cat) {
    const button = document.querySelector(`[data-label='${cat}']`);
    button.classList.remove('is-label-active');
  },
  removeAllActiveLabels() {
    const buttons = document.querySelectorAll(`[data-label]`);

    btnsArr = [...buttons];

    btnsArr.map((item) => {
      item.classList.remove('is-label-active');
    });
  },
  resetFilters() {
    const items = document.querySelectorAll(
      `.filtered-items--wrapper [data-prefers]`
    );

    itemsArr = [...items];

    itemsArr.map((item) => {
      item.classList.remove('is-item-selected');
    });

    this.removeAllActiveLabels();
  },
};

window.addEventListener('DOMContentLoaded', () => {
  boxes.init();

  const btn = document.querySelector('.reset-filters');

  btn.addEventListener('click', () => {
    boxes.resetFilters();
  });
});
