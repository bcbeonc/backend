const sort = (data) => {
    const be = []
    const ceonc = []
    data.map((items) => {
        if (items["TYPES_OF_HF"] === "ceonc") {
            ceonc.push(items);
        } else {
            be.push(items)
        }
    })

    return [
        {
            "name": "BC/BEONC",
            "data": buildResponse(be),
        },
        {
            "name": "CEONC",
            "data":buildResponse(ceonc)
        },
    ]
}

const buildResponse = (data) => {
    const Knowledge = getData(
        data, 
        'GROUP_GE4VE00_KNOWLEDGE_ASSESSMENT_SCORE', 
        {low:0, high:6.5}, 
        {low:6.5, high:13},
        {low:13, high:19.5},
        {low:19, high:26},
    );
    const pph = getData(
        data, 
        'GROUP_JY6HV93_MANAGEMENT_OF_SHOCK_DUE_TO_PPH', 
        {low:0, high:7.5}, 
        {low:7.5, high:15},
        {low:15, high:22.5},
        {low:22.5, high:30},
    );
    const plotting = getData(
        data, 
        'GROUP_JY6HV93_PANTOGRAPH_PLOTTING_SCORE', 
        {low:0, high:3.25}, 
        {low:3.25, high:6.50},
        {low:6.50, high:9.75},
        {low:9.75, high:13},
    );
    const referral = getData(
        data, 
        'GROUP_JY6HV93_REFERRAL_PROCEDURE_SCORE', 
        {low:0, high:2.75}, 
        {low:2.75, high:5.5},
        {low:5.5, high:8.25},
        {low:8.25, high:11},
    );
    const eclam = getData(
        data, 
        'GROUP_JY6HV93_MANAGEMENT_OF_SEVERE_PRE_ECLAM', 
        {low:0, high:7.75}, 
        {low:7.75, high:15.5},
        {low:15.5, high:23.25},
        {low:23.25, high:31},
    );
    const normal = getData(
        data, 
        'GROUP_CG7GG78__9_2_5_CONDUCT_NORMAL_DELIVERY', 
        {low:0, high:15.5}, 
        {low:15.5, high:31.0},
        {low:31.0, high:46.5},
        {low:46.5, high:62},
    );
    const vacuum = getData(
        data, 
        'GROUP_CG7GG78_CONDUCT_VACUUM_DELIVERY_AT_CE', 
        {low:0, high:7.75}, 
        {low:7.75, high:15.5},
        {low:15.5, high:23.25},
        {low:23.25, high:31},
    );
    const newborn = getData(
        data, 
        'GROUP_CG7GG78_NEW_BORN_RESUSCITATION_SCPRES', 
        {low:0, high:5}, 
        {low:5, high:10},
        {low:10, high:15},
        {low:15, high:20},
    );
    const condom = getData(
        data, 
        'GROUP_CG7GG78_CONDOM_TAMPONADE_SCORE', 
        {low:0, high:5.75}, 
        {low:5.75, high:11.5},
        {low:11.5, high:17.25},
        {low:17.25, high:23},
    );
    const kmc = getData(
        data, 
        'GROUP_CG7GG78_KANGAROO_MOTHER_CARE_SCORE', 
        {low:0, high:3.75}, 
        {low:3.75, high:7.5},
        {low:7.5, high:11.25},
        {low:11.25, high:15},
    );
    return [
        {
            "Name": 'Knowledge',
            "Q1": Knowledge.Q1,
            "Q2": Knowledge.Q2,
            "Q3": Knowledge.Q3,
            "Q4": Knowledge.Q4,
        }, 
        {
            "Name": "Shock due to PPH", 
            "Q1": pph.Q1,
            "Q2": pph.Q2,
            "Q3": pph.Q3,
            "Q4": pph.Q4,
        },
        {
            "Name": "Ploting", 
            "Q1": plotting.Q1,
            "Q2": plotting.Q2,
            "Q3": plotting.Q3,
            "Q4": plotting.Q4,
        },
        {
            "Name": "Mgmt of Eclampsla", 
            "Q1": eclam.Q1,
            "Q2": eclam.Q2,
            "Q3": eclam.Q3,
            "Q4": eclam.Q4,
        },
        {
            "Name": "Referral", 
            "Q1": referral.Q1,
            "Q2": referral.Q2,
            "Q3": referral.Q3,
            "Q4": referral.Q4,
        },
        {
            "Name": "Normal Delivery", 
            "Q1": normal.Q1,
            "Q2": normal.Q2,
            "Q3": normal.Q3,
            "Q4": normal.Q4,
        },
        {
            "Name": "Assisted Delivery", 
            "Q1": vacuum.Q1,
            "Q2": vacuum.Q2,
            "Q3": vacuum.Q3,
            "Q4": vacuum.Q4,
        },
        {
            "Name": "NBR", 
            "Q1": newborn.Q1,
            "Q2": newborn.Q2,
            "Q3": newborn.Q3,
            "Q4": newborn.Q4,
        },
        {
            "Name": "Condom Tamponade", 
            "Q1": condom.Q1,
            "Q2": condom.Q2,
            "Q3": condom.Q3,
            "Q4": condom.Q4,
        },
        {
            "Name": "KMC", 
            "Q1": kmc.Q1,
            "Q2": kmc.Q2,
            "Q3": kmc.Q3,
            "Q4": kmc.Q4,
        }
    ]
}

const getData = (data, name, q1,q2,q3,q4 ) => {
    let nameCountBeQ1 = 0;
    let nameCountBeQ2 = 0;
    let nameCountBeQ3  = 0;
    let nameCountBeQ4 = 0;
     data.map( (items) => {
        const score = items[name];
        if(score >= q1.low && score <= q1.high) {
            nameCountBeQ1++;
        } else if(score > q2.low && score <= q2.high) {
            nameCountBeQ2++;
        } else if(score > q3.low && score <= q3.high) {
            nameCountBeQ3++;
        } else {
            nameCountBeQ4++;
        }
        
    })
    return {
        "Q1": nameCountBeQ1,
        "Q2": nameCountBeQ2,
        "Q3": nameCountBeQ3,
        "Q4": nameCountBeQ4
    }
}

module.exports = {
    sort
}