import axios from "axios";
import { defineStore } from "pinia";


interface MultimediaItem {
    _id: string;
    description: string;
    file: File;
    image: string;
    category: string;
    fecha: string;
    __v: number;
}

export const useMultimediaStore = defineStore('Documentos', {
    state: () => ({
        documento: {} as MultimediaItem,
        documentos: [] as MultimediaItem[],
    }),


    actions: {
        setDocumentos(documentos: MultimediaItem[]) {
            this.documentos = documentos;
        },

       setTheme(theme:string):void {
          document.documentElement.setAttribute('data-theme', theme);
},

      async setUploadFile(file:File,image:string, description:string, category:string, type:string){
        const formData = new FormData();
            formData.append('file', file);
            formData.append('image', image)
            formData.append('description', description);
          formData.append('category', category);
          formData.append('type', type);
        try {
           await axios.post('http://localhost:8000/multimedia/carga', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

        } catch (error) {
          console.error('Error uploading multimedia item:', error);
        }
      },
      async setUpdateMultimedia(id:string, description:string){
        try {
          await axios.patch(`http://localhost:8000/multimedia/${id}`, {
            description: description
          });
          this.setMultimedia(id);
        } catch (error) {
          console.error('Error updating multimedia item:', error);
        }
      },
   async  setMultimedias(){
        try {
            const response = await axios.get('http://localhost:8000/multimedia');
          this.documentos= response.data;
        } catch (error) {
          console.error('Error fetching multimedia items:', error);
        }
      },
   async setDeleteMultimedia(id:string) {
    
    try {
        await axios.delete(`http://localhost:8000/multimedia/${id}`);
        this.setMultimedias();
    } catch (error) {
        console.error('Error deleting multimedia item:', error);
    }
      },
   async setMultimedia(id:string) {
    try{
        const response = await axios.get(`http://localhost:8000/multimedia/${id}`);
        this.documento= response.data;
    }catch(error){
        console.error('Error fetching multimedia item:', error);
    }
      },
    },
  })