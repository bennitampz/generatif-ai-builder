import React, { useContext, useState } from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Button} from '@/components/ui/button';
import {LayoutGrid} from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import global_api from '/service_api/global_api.js';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function ThemeColor() {

    const colors = [
        "#FF5733",
        "#33FF57",
        "#3357FF",
        "#FF33A1",
        "#A133FF",
        "#33FFA1",
        "#FF7133",
        "#71FF33",
        "#7133FF",
        "#FF3371",
        "#33FF71",
        "#3371FF",
        "#A1FF33",
        "#33A1FF",
        "#FF5733",
        "#5733FF",
        "#33FF5A",
        "#5A33FF",
        "#FF335A",
        "#335AFF",
        "#000000",
        "#B7B7B7"
    ]
    const{resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const [selectedColor, setSelectedColor] =useState();
    const {resumeId}=useParams()
    const onColorSelect=(color)=> {
      setSelectedColor(color)
      setResumeInfo({
        ...resumeInfo,
        themeColor: color
      });
      const data={
        data:{
          themeColor:color
        }
      }
      console.log('Sending data to API:', data);
      global_api.UpdateResumeDetail(resumeId,data).then(resp=>{
        console.log('API Response:', resp);
        console.log('Resume ID:', resumeId);
        console.log(resp);
        toast('Theme Color Updated Successfully')
      })
    }

    return (
        <Popover>
            <PopoverTrigger asChild="asChild">
                <Button variant="outline" size="sm" className="flex gap-2">
                    <LayoutGrid/>
                    Theme
                </Button>
            </PopoverTrigger>

            <PopoverContent>
            <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
                <div className='grid grid-cols-5 gap-3'>{
                        colors.map((item, index) => (
                            <div onClick={()=>onColorSelect(item)}
                                key={index}
                                className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border 
                                ${selectedColor === item && 'border border-black'}`}
                                style={{
                                    background: item
                                }}></div>
                        ))
                    }
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default ThemeColor;