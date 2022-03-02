// toggleSpinner
const toggleSpinner = displayStyle =>{
    document.getElementById('spinner').style.display = displayStyle;
}

// search field
const searchPhone = () =>{
    moreDetails.textContent = "";
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
    .then(data => displayPhone(data.data))
}
loadPhone('apple');

// displayPhone
const displayPhone = phoneData =>{
    const container = document.getElementById('result');
    container.textContent = '';
    if(phoneData.length == 0){
        // No phone found
        const noPhoneFound = document.getElementById('no-phone-found');
        noPhoneFound.innerText = "You haven't entered anything";
    }else{
        const noPhoneFound = document.getElementById('no-phone-found');
        noPhoneFound.innerText = "";
        
        // highet 20 resust 
        const phonses = phoneData.slice(0, 20);
        phonses.forEach(mobile => {
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
            <button onclick="seeMoreDetails('${mobile.slug}')" class="btn btn-outline-secondary ms-1">More Details</button>
        `
        allDiv.appendChild(div);
        container.appendChild(allDiv);
    });
    }
    // toggleSpinner
    toggleSpinner('none');
}

// more details 
const moreDetails = document.getElementById("more-details");

// MoreDetails fetch
const seeMoreDetails = id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => moreInfoFun(data.data))
}

// Show Detailes Fun
const moreInfoFun = (moreInfo) => {
    moreDetails.textContent = "";
    const div = document.createElement("div");
    div.classList.add("card");
    div.classList.add("bg-light");
    div.innerHTML = ` 
            <div class="row g-0 ">
                <div class="col-md-5 my-5">
                    <img src="${moreInfo.image}" class="img-fluid rounded mx-auto d-block" alt="...">
                    <h5 class="text-center mt-2">Model: ${moreInfo.name}</h5>
                </div>
                <div class="col-md-7">
                    <div class="ms-4 my-4">
                        <h5>Brand: ${moreInfo.brand}</h5>
                        <p class="card-text">${moreInfo.releaseDate ? moreInfo.releaseDate : "No release date found"}</p>
                        <h4>Features</h4>
                        <p class="card-text"><b>ChipSet</b> : <small>${moreInfo.mainFeatures.chipSet}</small></p>
                        <p class="card-text"><b>DisplaySize</b> : <small>${moreInfo.mainFeatures.displaySize}</small></p>
                        <p class="card-text"><b>Memory</b> : <small>${moreInfo.mainFeatures.memory}</small></p>
                        <p class="card-text"><b class="text-primary">Sensors</b> : <small>${moreInfo.mainFeatures.sensors}</small></p>
                        <p class="card-text"><b class="text-primary">Others</b> :<br> 
                          <b>Bluetooth :</b><small>${moreInfo?.others?.Bluetooth ? moreInfo?.others?.Bluetooth : "No more information"}</small>
                          <b>GPS :</b><small>${moreInfo?.others?.GPS ? moreInfo?.others?.GPS : "No more information"}</small>
                          <b>NFC :</b><small>${moreInfo?.others?.NFC ? moreInfo?.others?.NFC : "No more information"}</small>
                          
                        </p>
                    </div>
                </div>
            </div>
        `;
    moreDetails.appendChild(div)
}
