$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/", 
}).done((res)=>{
    // console.log(res.results);
    let temp="";
    $.each(res.results,function(key,val){
        // literal template
        temp += `<tr>
                    <td>${key+1}</td>
                    <td>${val.name.toUpperCase()}</td>
                    <td><button class="btn btn-primary" onclick="detailPoke('${val.url}')" data-bs-toggle="modal" data-bs-target="#modalDetailPoke">Detail</button></td>
                </tr>`;
    });
    // console.log(temp);
    $("#tablePoke").html(temp);

    }).fail((err)=>{
    console.log(err);
});

function detailPoke(url){
    $.ajax({
        url: url
    }).done((res)=>{
      console.log(res);
      $(".titlePokemon").html(res.name);
      speciesDetail(res.species.url);

      // Image
      let pict = "";
      pict = `
      <div class="carousel-item active">
        <img src="${res.sprites.other.dream_world.front_default}" class="d-block w-100" alt="...">
      </div>`
      $(".picture").html(pict);

    // Types
        let types = "";
        $.each(res.types, function (key, val) {
        types += `
        <span class="badge rounded-pill text-bg-info">${val.type.name}</span>`
        });
        $(".types").html(types);
      // Status
      let status = "";
      let rname = [];
      let rvalue = [];
       $.each(res.stats,function(key,val){
      status += `
      <p class="badge text-bg-warning" style="text-transform: capitalize; margin: 3px auto">${val.stat.name}</p>
        <div class="progress">
          <div id="bar" class="progress-bar bg-success" role="progressbar" aria-label="Example with label" style="width:${val.base_stat}%;" aria-valuenow="${val.base_stat}" aria-valuemin="0" aria-valuemax="100">${val.base_stat}</div>
        </div>
        <br>
      `
      rname.push(val.stat.name);
      rvalue.push(val.base_stat);
      $(".status").html(status);

      // Witdh and Height
      let size = "";
      size = `
      <span class="badge text-bg-primary">Weight : ${res.weight} kg</span>
      <span class="badge text-bg-danger">Height : ${res.height} m</span>
      `
      $(".size").html(size);

      //XP And HP
      let hp = "";
      hp = `
      <span class="badge text-bg-success">Exp : ${res.base_experience} </span>
      `
      $(".stat").html(hp);

      //Abilities
      let skill = "";
      skill = `
      <span class="badge rounded-pill text-bg-danger">${res.abilities[0].ability.name}</span>
      <span class="badge rounded-pill text-bg-danger">${res.abilities[1].ability.name}</span>
      `
      $(".skill").html(skill);
    })
    console.log(rname);
    console.log(rvalue);
    }).fail((err)=>{
      console.log(err);
    });
}

  function speciesDetail(url){
    $.ajax({
      url:url
    }).done((res)=>{
      console.log(res.flavor_text_entries[0].flavor_text);
      let desc = "";
      desc = `${res.flavor_text_entries[0].flavor_text}`
      $(".description").html(desc);
      
    }).fail((err)=>{

    })
  }