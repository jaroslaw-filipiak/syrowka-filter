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
          : boxes.UnfilterBoxes(`${item.dataset.label}`, activeLabels , item);
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
  UnfilterBoxes(filterBy , activeLabelsList , clicked) {

    const filter = filterBy;

	const labels = document.querySelectorAll(`[data-label]`);
	
    const items = document.querySelectorAll(
      `.filtered-items--wrapper [data-prefers]`
    );

	const labelsArr = [...labels]
    const resultsArr = [...items];

    const hasPreffer = (item) => {
      const itemPreffersList = item.dataset.prefers.split(',');

      if (itemPreffersList.includes(filter)) {
        return true;
      }
    };

	const hasClass = (item) => {
		const itemClassList = item.classList;
		// console.log(itemClassList)
  
		if (itemClassList.contains('is-label-active')) {
		  return true;
		}
	  };

    const results = resultsArr.filter(hasPreffer)


	// przed drugim filtrem oznaczam labelke
	this.removeActiveLabel(filterBy);

	// ================
	// drugi filter

	const selectedLabels = labelsArr.filter(hasClass);
	// const step3 = results2.map((item) => {
	// 	console.log('classlist ' + item.classList)
	// })
	console.log(selectedLabels)

	// console.log(clicked.classList)

    

	// ================

    results.map((item) => {
      item.classList.remove('is-item-selected');
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