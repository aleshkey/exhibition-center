package org.exhibition.lab2.Dto;

import com.fasterxml.jackson.databind.JsonNode;
import org.exhibition.lab2.model.Exhibition;
import org.exhibition.lab2.model.Hall;
import org.exhibition.lab2.service.ExhibitionService;
import org.exhibition.lab2.service.HallService;
import org.exhibition.lab2.service.OwnerService;
import org.exhibition.lab2.service.Service;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;


@Component
public class HallMapper implements Mapper<Hall>{
    @Autowired
    private HallService hallService;

    @Autowired
    private OwnerService ownerService;

    @Autowired
    private ExhibitionService exhibitionService;

    @Override
    public Service<Hall> getService() {
        return hallService;
    }

    @Override
    public Hall fromJson(JsonNode modelInJson) {
        JSONObject jsonObject = new JSONObject(modelInJson.toString());
        Hall model = new Hall();
        model.setName(jsonObject.getString("name"));
        model.setAddress(jsonObject.getString("address"));
        model.setSquare(jsonObject.getDouble("square"));
        model.setOwner(ownerService.getOwnerByName(jsonObject.getString("owner")));
        if(exhibitionService.findByName(jsonObject.getString("exhibition")) != null) {
            Exhibition exhibition = exhibitionService.findByName(jsonObject.getString("exhibition"));
            exhibition.setFree(false);
            model.setExhibition(exhibition);
        }
         return model;
    }
}
