




class App{
    constructor(){
        this.req = new XMLHttpRequest()
        this.url = '';
        this.onPageAyahs=false;
          
        
     }

    async getAllSurahsFromAPI(url,container){
        container = document.querySelector(container)
        this.url = url;
       

        try {
          const response = await fetch(url);

          // Memeriksa apakah responsenya sukses (status kode 200-299)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          // Mengonversi responsenya ke format JSON
          const data = await response.json();

          // Data berhasil diambil
            this.buildData(data,container)
            this.searchForm()

           
        } catch (error) {
          // Menangani kesalahan
          console.error('There has been a problem with your fetch operation:', error);
        }





       
     }

     buildData(data,container){
      
      const getRead=new Set();
      
      if(localStorage.getItem('read')){
        [...localStorage.getItem('read').split(',')].forEach((e)=>{
          getRead.add(e)
       })
      }
      console.log(data)
       
 
  
 
         data.forEach((item)=>{
          
      container.innerHTML += `   <div class="box flex flex-col border shadow-sm p-2 rounded-md h-28 gap-2 hover:bg-slate-900 group relative cursor-pointer"> 

        
  <div class="text-content group text-sm flex justify-between">
  <h1 class="text-title group-hover:text-white ">${item.name}</h1>
  <div class="text-number text-slate-100    bg-primary rounded-full flex  w-6 h-6">

    <span class="block mx-auto my-auto">${item.number}</span>
  </div>

     
</div>

<div class="  w-full  text-center ">
<h3 class="text-[0.8rem] text-primary">'${item.translation}'</h3>
</div>



<div class="  w-full p-2 text-center flex justify-between font-thin absolute bottom-0 left-0   ">
<span class="text-[0.7rem] text-dark group-hover:text-white">number of ayahs </span>
<h3 class="text-[0.7rem] text-dark group-hover:text-white">${item.numberOfAyahs}</h3>
</div>

        </div>`

          })


          const textTitle=document.querySelectorAll('.text-title')
          getRead.forEach((g)=>{
              textTitle.forEach((e)=>{
                if(g === e.textContent){
                  console.log(true)
                  e.offsetParent.style.border="1px solid orange"
                }
             })

          })
     

          this.watchClick();

      }

      async getSurahFromNumber(number=0){
         try {
          const response = await fetch(`${this.url}/${number}`);

          // Memeriksa apakah responsenya sukses (status kode 200-299)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          // Mengonversi responsenya ke format JSON
          const data = await response.json();

          // Data berhasil diambil
          this.setPageAyahs(data)
 
           
        } catch (error) {
          // Menangani kesalahan
          console.error('There has been a problem with your fetch operation:', error);
        }

      }
      

      // mengambil data quran dari input user
      async getSurahFromInput(input){
          
      }
     


         /*
       ############################
          ini adalah function untuk
          menerapkan form pencarian
       ###########################
      */
      searchForm(){
      
          const box=document.querySelectorAll('.box')
          // const validText=box[0].firstElementChild.textContent.trim().startsWith('A')

          const input = document.querySelector('#input-form')

           input.addEventListener('input',(e)=>{
            const value=e.target.value.toLowerCase()
             const contentAlquran=document.querySelector('.content-alquran')
  
              setTimeout(()=>{
       
    
                  const regex = new RegExp(`^${value}|${value}|${value}$`,'gi');
  
                  box.forEach((elem) => {
                    const elemText = elem.firstElementChild.textContent.toLowerCase();
            
                    if (regex.test(elemText)) {
                        elem.classList.remove('hidden')
                    } else {
                      elem.classList.add('hidden')
                      
                     }
                     if(this.onPageAyahs){
                      contentAlquran.classList.remove('hidden')
                     
                     } 
                     if(this.onPageAyahs && value == ''){
                      contentAlquran.classList.add('hidden')
                    }

                  });
  
                },100)

         
  
           
          })
        

          const btnForm=document.getElementById('btn-form')
          btnForm.addEventListener('click',()=>{
            const input = document.querySelector('#input-form')
            const value=input.value.toLowerCase()

            const contentAlquran=document.querySelector('.content-alquran')
            const regex = new RegExp(`^${value}|${value}|${value}$`,'gi');
  
            box.forEach((elem) => {
              const elemText = elem.firstElementChild.textContent.toLowerCase();
      
              if (regex.test(elemText)) {
                  elem.classList.remove('hidden')
              } else {
                elem.classList.add('hidden')
                
               }
               if(this.onPageAyahs){
                contentAlquran.classList.remove('hidden')
 
               } 
               if(this.onPageAyahs && value == ''){
                contentAlquran.classList.add('hidden')
              }

            });

          })



 

        
   
      }
 



      setPageAyahs(data){



        const bismillah = document.querySelector('.page-ayahs .bismillah h1')
        const ayahs = document.querySelector('.page-ayahs .ayahs')
        ayahs.innerHTML ='' 

       const audioControls=document.querySelector('.audio-controls');
       audioControls.classList.toggle('hidden')
      const audio = document.querySelector('.audio-controls audio')

        
        const surahs=document.querySelector('.page-content-ayahs .page-title h1')

         bismillah.textContent = data.bismillah.arab
         bismillah.classList.add('sm:text-4xl')
         if(data.number == 1){
          audio.src = data.audio
          surahs.textContent = data.name
          localStorage.setItem('read',[localStorage.getItem('read'),data.name])
           var iquran=1;
           bismillah.innerHTML += `
          <div class="number-icon-quran">
            <span class="text-white font-bold font-quran text-2xl">${iquran}</span>
          </div>`
          
          data.ayahs.forEach((a,i)=>{
                if(i > 0){
                iquran ++
                const translation = document.createElement('p')
                translation.textContent = a.translation
                translation.id="translation"


                const cardAyah=document.createElement('div')
                 cardAyah.classList.add('card-ayahs')
 
                const span = document.createElement('span')
                span.id = 'text-ayahs'
                span.classList.add('sm:text-3xl')

                // span.classList.add('border')
                 

                 span.textContent = a.arab.replace(/[َࣖ۞]/g, '');
                 
                 cardAyah.appendChild(span)
                 cardAyah.appendChild(translation)

                 ayahs.appendChild(cardAyah)

                 cardAyah.innerHTML += `
                 <div class="number-icon-quran">
                   <span class="text-white font-bold font-quran text-md">${a.number.inSurah}</span>
                 </div> 
    
                 `
                 
               }
           })

           return;
         }
         localStorage.setItem('read',[localStorage.getItem('read'),data.name])

          data.ayahs.forEach((a,i)=>{
           surahs.textContent = data.name
           audio.src = data.audio

          const translation = document.createElement('p')
          translation.textContent = a.translation
          translation.id="translation"

             const cardAyah=document.createElement('div')
              cardAyah.classList.add('card-ayahs')
   

            const span = document.createElement('span')
            span.id = 'text-ayahs'

            // span.classList.add('border')
            
             

            span.textContent = a.arab.replace(/[َࣖ۞]/g, '');
            span.classList.add('sm:text-3xl')
 
            cardAyah.appendChild(span)
            cardAyah.appendChild(translation)

            ayahs.appendChild(cardAyah)
 
            cardAyah.innerHTML += `
            <div class="number-icon-quran">
              <span class="text-white font-bold  font-quran text-md">${a.number.inSurah}</span>
            </div>`
         })

         
       }



      watchClick(){
        const pageAyahs=document.querySelector('.page-content-ayahs')
         window.addEventListener('click',(event)=>{
            if(event.target.classList.contains('box')){
               const number = parseInt(event.target.children[0].lastElementChild.textContent.trim())
                event.target.parentNode.classList.add('hidden')
               pageAyahs.classList.remove('hidden')
               this.getSurahFromNumber(number)
               this.onPageAyahs=true;
               const input = document.querySelector('#input-form')
               input.value=''
 
            

               return;
            }else if(event.target.offsetParent.classList.contains('box')){
              const number = parseInt(event.target.offsetParent.children[0].lastElementChild.textContent.trim())
              event.target.offsetParent.parentNode.classList.add('hidden')
              pageAyahs.classList.remove('hidden')
              this.onPageAyahs=true;
              this.getSurahFromNumber(number)
              const input = document.querySelector('#input-form')
              input.value=''
              


               return;
            } 
            




         })
      }

    





}


const app = new App();
app.getAllSurahsFromAPI('https://quran-api-id.vercel.app/surahs','.content-alquran');
  
 

document.getElementById('logo').addEventListener('click', function() {
   window.location.reload();
 
});

 
  