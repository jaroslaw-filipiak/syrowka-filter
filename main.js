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
          : boxes.UnfilterBoxes(`${item.dataset.label}`, activeLabels, item);
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
