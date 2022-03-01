// toggleSpinner
const toggleSpinner = displayStyle =>{
    document.getElementById('spinner').style.display = displayStyle;
}

// search field
const searchPhone = () =>{
    const searchText = document.getElementById('search-field').value;
    // toggleSpinner
    toggleSpinner('block');

    loadPhone(searchText);
    document.getElementById('search-field').value = '';
}

// loadPhone
const loadPhone = searchText => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhone(data))
}
loadPhone('apple');

// displayPhone
const displayPhone = phone =>{
    const container = document.getElementById('result');
    container.textContent = '';
    phone.data.forEach(mobile => {
        const allDiv = document.createElement('div');
        allDiv.classList.add('col-md-4');
        const div = document.createElement('div');
        div.classList.add('text-center');
        div.classList.add('p-3');
        div.classList.add('border');
        div.classList.add('bg-light');
        div.innerHTML = `
            <h3>${mobile.phone_name}</h3>
            <img src="${mobile.image}"/>
            <h4>Brand: ${mobile.brand}</h4>
            <button onclick="clickMoreDetails()" class="btn btn-outline-secondary ms-1">More Details</button>
        `
        allDiv.appendChild(div);
        container.appendChild(allDiv);
    });
    // toggleSpinner
    toggleSpinner('none');
}

// more details 
const clickMoreDetails = () =>{
    const moreDetails = document.getElementById('more-details');
    moreDetails.innerHTML = `
    <p>hello</p>
    `
}