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

	const hasClass = (item) => {
		const itemClassList = item.classList;
  
		if (itemClassList.contains('is-label-active')) {
		  return true;
		}
	  };

	// przed drugim filtrem oznaczam labelke
	this.removeActiveLabel(filterBy);

	// ================
	// drugi filter

	const selectedLabels = labelsArr.filter(hasClass);

	const selectedLabelsArr = [];
	
	const activeOtherFilters = selectedLabels.map((item) => {
		selectedLabelsArr.push(item.dataset.label);
	})

	// ================

	const hasPreffer = (item) => {
		const itemPreffersList = item.dataset.prefers.split(',');
  
		if (itemPreffersList.includes(filter)) {
		  return true;
		}
	  };

	const results = resultsArr.filter(hasPreffer)

	// ====

	const secondFilter = (results , arr) =>  {
		// console.log(results)
		// console.log( 'passing labels arr to func ' + arr)

		// console.log(arr)
		// console.log(results)

		// results jako zbiór do odznaczenia musi być przefiltrowany aby sprawdzić czy te elementy które
		// powinny zostać odchaczone nie posiadają prefers z zaznaczonego arr

		results.map((item) => {

			// filter

			
			const newResults = []

			
			if(arr.length > 0) {

			// TODO: iteracja po results , i jeżeli results[index].dataset.prefers.inlcudes(results[index])
			// to nie odznaczaj , czyli nie usuwaj klasy


			
			

			results.map((result , index) => {
				if(result.dataset.prefers.includes(arr.toString())) {
					newResults.push(result)
				} else {
					
				}
			
			})
			

			console.log('new results==================')
			console.log(newResults)
			console.log('new results==================')


			}

			item.classList.remove('is-item-selected');

			// następnie te dwa elementy w new results powinny zostac zaznaczone

			newResults.map((item) => {
				item.classList.add('is-item-selected')
			})

			// for (let index = 0; index < arr.length; index++) {
			// 	const arrItem = arr[index];
			// 	console.log(arrItem)

			// 	if(item.dataset.prefers.includes(arrItem[index])) {
			// 		item.classList.add('is-item-selected')
			// 		item.classList.add('cant-remove-class-because-other-label-contains')
			// 		console.log('zawiera')
			// 	} else {
			// 		item.classList.remove('is-item-selected');
			// 		console.log('niezawiera')
			// 	}
				
			// }

			

			// item.classList.remove('is-item-selected');

			// console.log('arr==================')
			// console.log(arr) // labelki zaznaczone
			// console.log(arr.length)
			// console.log(arr.toString());
			// console.log('arr==================')

			console.log('results==================')
		    console.log(results) // elementy w tablicy
			console.log('results==================')
			
			// console.log(item.dataset.prefers)
			// item.classList.remove('is-item-selected');
		  });
	}
	
	secondFilter(results ,selectedLabelsArr);

    

    
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
