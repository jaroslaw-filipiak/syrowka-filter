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
      // result to są ostatnie kliknięte elementy
      //   TODO: coś tutaj jest nie tak w momencie gdy wiecej niż 3 labelki
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
	1a. usuwam z tej listy kliknięt obiekt
	1b. wyciągam z nich dataset i wrzucam do tablicy 
	z currentLabels 

	2.robie sobie drugą tablice , która to zawiera wszystkie aktualnie zaznaczone  itemy i wyciągam z tych itemów dataset. preffers

	3. robie iteracje po drugiej tablicy i sprawdzam czy każdy element posiada w prefers ciąg znaków zaznaczony w labelce , jeżeli posiada to nie robie z nim nic a jeżeli posiada to wrzucam go do finalnej tablicy z elementami do odznaczenia

	4. robie map po elementach do odznaczenia i usuwam klase is active

	*/

    // odznaczam klikniętą labelke
    this.removeActiveLabel(clickedFilter);

    // sprawdzam które aktywne labelki zostały i tworze tablice z wszytkimi aktywnymi(zaznaczonymi) labelkami
    const labels = document.querySelectorAll(`.is-label-active`);
    const labelsArr = [...labels];
    const activeLabelsArr = [];
    labelsArr.map((item) => {
      activeLabelsArr.push(item.dataset.label);
    });

    // chciałbym sprawdzić wszystkie aktualnie zaznaczone itemy i zobaczyć czy czasami
    // jakiś z tych elementów nie ma w sobie dataset.preffers które aktualnie istnieje
    // w zaznaczonej labelce a raczej w tej tablicy

    // coś mi się zdaje, że trzeba dodać spacje aby to wyodrębnić , zrobić 2 tablice
    // i je porównać

    // mam 2 tablice : z zaznaczonymi labelkami oraz wyciągam tablice z
    // każego elementu

    // mam dwa stringi z wartościami oddzielone spacjami

    const activeItems = document.querySelectorAll('.is-item-selected');
    const activeItemsArr = [...activeItems];
    const matchingItemsArr = [];

    activeItemsArr.map((item, index) => {
      const prefersStr = item.dataset.prefers.split(',').join(' ').toString();
      const activeLabelsStr = activeLabelsArr.toString().split(',').join(' ');

      //   zamiast sprawdzać activeLabelsStr , lepiej zrobić z tego tablice i iterować
      //   po każdym elemencie tablicy ?
      //   ale każdy element w itercji musi być osobnym stringiem

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

    // zanim do wspólnych elementów dodam klase is item selected , chciałbym wziąść
    // wszystkie możliwe elementy i usunąc im tę klasy - aby zostały tylko części wspólne

    activeItemsArr.map((item) => {
      item.classList.remove('is-item-selected');
    });

    // wspólnie elementy (zostawiam aktywną klase)
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
