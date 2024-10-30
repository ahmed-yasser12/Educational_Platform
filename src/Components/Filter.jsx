import { useContext, useEffect, useState } from "react";
import style from "../../src/Styles/Filter.module.css"
import axios from "axios";
import { FilterContext } from "../Contexts/FilterContext";
export default function Filter() {
    // VARIABLES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    let stage = { first: "الصف الاول", second: " الصف الثاني", third: "الصف الثالث", fourth: "الصف الرابع", fifth: "الصف الخامس", sixth: "الصف السادس" };
    let grade = { primary: "الابتدائي", preparatory: "الاعدادي ", secondary: "الثانوي" };
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [isOpenStage, setIsOpenStage] = useState(false);
    const [isOpenGrade, setIsOpenGrade] = useState(false);
    const [supCategories, setsupCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const { setWordSearch, setStage, setGrade, setGradeName, setStageName } = useContext(FilterContext)
    // FUNCTIONS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // FUNCTION GET ALL CATEGORIES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    async function getAllCategories() {
        const { data } = await axios.get(`${baseURL}/category/`);
        setCategories(data.categories)
    }
    // FUNCTION GET ALL SUB CATEGORIES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    async function getAllSubCategories() {
        const { data } = await axios.get(`${baseURL}/subcategory/`);
        setsupCategories(data.Subcategories)
    }
    // USEEFFECT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    useEffect(() => {
        getAllCategories();
        getAllSubCategories();
    }, []);
    // RENDER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return <>
        <div>
            <input onChange={(e) => setWordSearch(e.target.value.toLocaleLowerCase())} type="text" className="w-100 p-3 bg-light" placeholder="ابحث عن دورة" />
            {/* <div className={`border border-1 border-muted my-3 rounded-2 ${style.cursorPointer}`}>
                <div onClick={() => setIsOpenGrade(!isOpenGrade)} className="d-flex justify-content-between  pt-3 px-3 pb-2  align-items-center">
                    <p className="text-black small pt-2">المرحلة الدراسية </p>
                    <i className={`${style.link} fa-solid ${!isOpenGrade ? 'fa-angle-down' : 'fa-angle-up'} bg-light p-2 rounded-circle  `}></i>
                </div>
                {isOpenGrade ? <div>
                    <hr className="text-muted" />
                    {categories?.length > 0 ? categories.map((item, index) => <div key={index} className={`d-flex pt-1 px-3 ${style.item}`}>
                        <i className="fa-solid fa-graduation-cap ms-2 py-1"></i>
                        <p onClick={() => { setGrade(item._id); setGradeName(grade[item.name]) }} className="text-muted "> {grade[item.name]}   </p>
                    </div>) : <div className="text-center p-5"><i className="fa fa-spin fa-spinner"></i></div>}
                </div> : ""}
            </div> */}
            {/* ******************************************************************************* */}
            <div className="border border-1 border-muted my-3 rounded-2">
                <div onClick={() => setIsOpenStage(!isOpenStage)} className={`d-flex justify-content-between  pt-3 px-3 pb-2  align-items-center ${style.cursorPointer}`}>
                    <p className="text-black small pt-2">الصفوف</p>
                    <i className={`${style.link} fa-solid ${!isOpenStage ? 'fa-angle-down' : 'fa-angle-up'} bg-light p-2 rounded-circle `}></i>
                </div>
                {isOpenStage ? <div>
                    <hr className="text-muted" />
                    {supCategories?.length > 0 ? supCategories.map((item, index) => <div key={index} className={`d-flex pt-1 px-3 ${style.item}`}>
                        <i className="fa-solid fa-graduation-cap ms-2 py-1"></i>
                        <p onClick={() => { setStage(item._id); setStageName(stage[item.name]); setGrade(item?.categoryId?._id); setGradeName(grade[item?.categoryId?.name]) }} className="text-muted "> {stage[item?.name]} {grade[item?.categoryId?.name]}  </p>
                    </div>) : <div className="text-center p-5"><i className="fa fa-spin fa-spinner"></i></div>}
                </div> : ""}
            </div>
        </div>
    </>
}